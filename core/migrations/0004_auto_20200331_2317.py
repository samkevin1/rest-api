# Generated by Django 3.0.4 on 2020-04-01 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20200331_1943'),
    ]

    operations = [
        migrations.AddField(
            model_name='catalog',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
