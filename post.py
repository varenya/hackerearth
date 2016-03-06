import jsonpickle
import httplib
import sys
import pdb


def putPayment(input_dict):
        try:
            payload = jsonpickle.encode(input_dict,unpicklable=False)
	    Url = "10.213.172.8:8000"
	    Content_Type = "application/json"
	    Connection = httplib.HTTPConnection(Url)
	    print
	    print "-----------PAYLOAD ----------------",payload
            Connection.request("POST","/paymentdetail_list/",payload,{'Content-Type':Content_Type})
            response = Connection.getresponse()
            response_dict= response.read()
            if response.status == 201:
                    print "Succesfully added"
            else:
                    print "API could not add returned error code %s and reason %s" %(response.status,response.reason)
                    print response_dict
        except Exception,e:
            print "Exception in putPayment() error: %s and line : %s"%(str(e), format(sys.exc_info()[-1].tb_lineno))

def getPayment():
        try:
	    Url1 = "hackerearth.0x10.info"
	    Connection = httplib.HTTPConnection(Url1)
            Connection.request("GET","/dump/veritrans/VT_Services.json")
            response = Connection.getresponse()
	    asObj = jsonpickle.decode(response.read())
	    for item in asObj['payment_gateways']:
		    	print item
			putPayment(item)
        except Exception,e:
            print "Exception in getPayment() error: %s and line : %s"%(str(e), format(sys.exc_info()[-1].tb_lineno))


if __name__ == "__main__":
	getPayment()
