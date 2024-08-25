
import os
from peewee import *
from datetime import *
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(base_dir, 'database.sqlite')
database = SqliteDatabase(db_path)

class UnknownField(object):
    def __init__(self, *_, **__): pass

class BaseModel(Model):
    class Meta:
        database = database

class NewsContents(BaseModel):
    content = CharField(null=True)
    created_at = DateTimeField(column_name='createdAt')
    date_source_author = CharField(column_name='dateSourceAuthor', null=True)     
    title = CharField(null=True)
    updated_at = DateTimeField(column_name='updatedAt')

    class Meta:
        table_name = 'NewsContents'

class SqliteSequence(BaseModel):
    name = BareField(null=True)
    seq = BareField(null=True)

    class Meta:
        table_name = 'sqlite_sequence'
        primary_key = False

onemore =  NewsContents(title="pythonmeow", date_source_author="lol", created_at=datetime.now(), updated_at=datetime.now())
onemore.save()


for news in NewsContents.select():
    print(news.title)
