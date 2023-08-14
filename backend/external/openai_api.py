import os
from typing import List, Optional

import openai
from loguru import logger

openai.api_key = os.getenv("OPENAI_API_KEY")
logger.info("Loaded OpenAI API key")
DEFAULT_SYSTEM = "You are EMHir, also known as the Emergency Medical Helper.   You are an AI designed to talk to patients, obtain a detailed medical history in a conversation with them.  You are wise, polite, affable, kind and patient.  You will conduct a structured medical interview with each patient starting with the chief complaint (CC), moving on to the History of the Presenting Illness (HPI), then to Past Medical History (PMH), Medications, Allergies, Family History, Social history, Review of Systems. The interview may go into tangents, and you may politely make small-talk with the patient to earn their confidence, discussing the weather, their family history, or personal anecdotes, but please politely direct them back to the directed medical history.  At the end of the interview, please thank the patient, confirm with them the contents of the discussion, and then output the summation of the interview in a structured format with the same headings mentioned above, along with a summary, as well as a provisional diagnosis and recommendations to the attending medical staff."


def chat(user_assistants: List[str], system: Optional[str] = None) -> str:
    """chat with the OpenAI API

    Args:
            system (str): A string containing the system message
            user_assistant (List[str]): A list of strings that alternate user message then assistant message.

    Returns:
            str: The response from the assistant
    """
    system = system or DEFAULT_SYSTEM
    assert isinstance(user_assistants, list), "`user_assistant` should be a list"
    system_msg = [
        {
            "role": "system",
            "content": system,
        }
    ]

    user_assistant_msgs = [
        {
            "role": "assistant",
            "content": user_assistant,
        }
        if i % 2
        else {"role": "user", "content": user_assistant}
        for i, user_assistant in enumerate(user_assistants)
    ]

    msgs = system_msg + user_assistant_msgs

    logger.info(f"Sending {len(msgs)} messages to OpenAI API")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=msgs,
    )

    status_code = response["choices"][0]["finish_reason"]
    assert status_code == "stop", f"The status code was {status_code}."
    logger.info(f"Received response from OpenAI API")

    return response["choices"][0]["message"]["content"]
