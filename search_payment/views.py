from django.shortcuts import render

# Create your views here.
from search_payment.models import PaymentDetail
from search_payment.serializers import PaymentDetailSerializer
from rest_framework import generics
from rest_framework import filters


class PaymentDetailList(generics.ListCreateAPIView):
    queryset = PaymentDetail.objects.all()
    serializer_class = PaymentDetailSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)



class PaymentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = PaymentDetail.objects.all()
    serializer_class = PaymentDetailSerializer

