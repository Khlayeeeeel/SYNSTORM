from database.db import db_manager
from fastapi import HTTPException, status
import logging

# Configure logging to track ID generation
logger = logging.getLogger(__name__)

async def get_next_sequence_number(counter_name: str, padding: int = 8) -> str:
    """
    Increments a named counter in MongoDB and returns a padded string ID.
    
    Args:
        counter_name (str): The ID of the counter (e.g., 'patient_id', 'staff_id')
        padding (int): The total length of the string (default 8 for '00000001')
        
    Returns:
        str: The formatted ID (e.g., "00000042")
    """
    try:
        # 1. Atomic Update: Find the counter and increment it by 1
        # upsert=True: If the document doesn't exist, create it.
        # return_document=True: Give us the value AFTER the increment.
        counter = await db_manager.db.counters.find_one_and_update(
            {"_id": counter_name},
            {"$inc": {"seq": 1}},
            upsert=True,
            return_document=True
        )

        seq_value = counter.get("seq")

        # 2. Limit Validation (99,999,999 for 8 digits)
        max_value = int("9" * padding)
        if seq_value > max_value:
            logger.critical(f"Counter {counter_name} has exceeded its limit of {max_value}!")
            raise HTTPException(
                status_code=status.HTTP_507_INSUFFICIENT_STORAGE,
                detail="System reached maximum capacity for new IDs."
            )

        # 3. String Formatting
        # f"{value:08d}" turns 5 into "00000005"
        formatted_id = f"{seq_value:0{padding}d}"
        
        logger.info(f"Generated new ID: {formatted_id} for {counter_name}")
        return formatted_id

    except Exception as e:
        logger.error(f"Database error during ID generation: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not generate medical ID. Please contact system admin."
        )

async def reset_counter(counter_name: str, start_at: int = 0):
    """
    Utility function to reset or set a specific starting point for a counter.
    Useful for testing or system migrations.
    """
    await db_manager.db.counters.update_one(
        {"_id": counter_name},
        {"$set": {"seq": start_at}},
        upsert=True
    )