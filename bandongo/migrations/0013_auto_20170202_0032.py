# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-02-02 00:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bandongo', '0012_auto_20170131_1447'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
