# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-02-18 16:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bandongo', '0044_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='arrived',
            field=models.BooleanField(default=False),
        ),
    ]
