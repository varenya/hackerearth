from __future__ import unicode_literals

from django.db import models

# Create your models here.
class PaymentDetail(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=1000)
	image = models.URLField(max_length=2000)
	description = models.CharField(max_length=1000)
	branding = models.IntegerField()
	rating = models.FloatField()
	currencies = models.CharField(max_length=2000)
	setup_fee = models.IntegerField()
	transaction_fees = models.CharField(max_length=1000)
	how_to_url = models.URLField(max_length=2000)

