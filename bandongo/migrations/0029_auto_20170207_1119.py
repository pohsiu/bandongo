# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-02-07 11:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bandongo', '0028_savelog_commemt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='savelog',
            name='commemt',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]