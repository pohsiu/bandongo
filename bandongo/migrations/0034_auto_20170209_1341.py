# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-02-09 13:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bandongo', '0033_auto_20170209_0051'),
    ]

    operations = [
        migrations.AddField(
            model_name='drinkorder',
            name='finish',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='foodorder',
            name='finish',
            field=models.BooleanField(default=False),
        ),
    ]
