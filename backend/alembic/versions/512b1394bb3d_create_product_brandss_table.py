"""create product_brandss table

Revision ID: 512b1394bb3d
Revises: 202114576772
Create Date: 2024-07-08 14:32:57.910119

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '512b1394bb3d'
down_revision: Union[str, None] = '202114576772'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
