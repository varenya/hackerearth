from django.shortcuts import render
import json
from django.http import HttpResponse,HttpResponseRedirect

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




def get_total_number(request):
    queryset = PaymentDetail.objects.all()
    data = {"length": len(queryset)}
    return HttpResponse(json.dumps(data),content_type="application/json")
