import re


def extract_amount(text: str):
    match = re.search(r"\d+", text)

    if match:
        return float(match.group())

    return 0


def extract_title(text: str):
    title = re.sub(r"\d+", "", text)

    words_to_remove = [
        "rupees",
        "rupee",
        "rs",
        "Rs",
        "PKR",
        "pkr"
    ]

    for word in words_to_remove:
        title = title.replace(word, "")

    return title.strip()