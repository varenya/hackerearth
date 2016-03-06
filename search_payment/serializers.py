from rest_framework import serializers
from search_payment.models import PaymentDetail

class PaymentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetail
