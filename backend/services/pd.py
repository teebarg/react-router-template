import pandas as pd

from core.logging import logger


def data_to_excel(items, filename: str = "export.xlsx"):
    try:
        df = pd.DataFrame([item.model_dump() for item in items])
        df.to_excel(filename, index=False)
        return filename
    except Exception as e:
        logger.error(f"Error exporting to Excel: {e}")
        raise Exception(str(e)) from e


def data_to_csv(items, filename: str = "export.csv"):
    try:
        df = pd.DataFrame([item.model_dump() for item in items])
        df.to_csv(filename, index=False)
        return filename
    except Exception as e:
        logger.error(f"Error exporting to CSV: {e}")
        raise Exception(str(e)) from e
