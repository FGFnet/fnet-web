from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LC
from .models import FG
from .serializers import LCSerializer, UpdateLCSerializer
import dateutil.parser

# Create your views here.
class LCAPI(APIView):
    def get(self, request):
        user = request.user
        lc_name = request.GET.get("name")
        if lc_name:
            try:
                queryset = LC.objects.get(name=lc_name)
                data = LCSerializer(queryset).data
            except LC.DoesNotExist:
                return Response({"error": True, "data": "LC name error"})
        else:
            if user.campus == 'n':
                queryset = LC.objects.filter(fg_n=user.id)
            else:
                queryset = LC.objects.filter(fg_s=user.id)
            data = LCSerializer(queryset, many=True).data
        return Response({"error":False, "data":data})
    
    def delete(self, request):
        if request.user.is_authenticated:
            return  Response({"error": True, "data": "login required"})
        
        lc_id = request.GET.get("id")
        if not lc_name:
            return Response({"error":True, "data":"Invalid parameter"})

        try:
            queryset = LC.objects.get(id=lc_id)
            queryset.delete()
        except LC.DoesNotExist:
            return Response({"error":True, "data":"LC does not exist"})
        
        return Response({"error":False, "data":None})

    def post(self, request):
        user = request.user
        data = request.data
        data['schedule'] = dateutil.parser.parse(data["schedule"]).date()

        serializer = UpdateLCSerializer(data=data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"error": True, "data":"Invalid data"})
        
        data = serializer.data
        
        try:
            lc = LC.objects.get(name=data['name'])
            if user.campus == 'n':
                lc.fg_n = user
            else:
                lc.fg_s = user
            
            lc.schedule = data['schedule']
            lc.save()
            
        except LC.DoesNotExist:
            if user.campus == 'n':
                LC.objects.create(fg_n=user,
                                fg_s=None,
                                name=data['name'],
                                schedule=data['schedule'])
            else:
                LC.objects.create(fg_n=None,
                                fg_s=user,
                                name=data['name'],
                                schedule=data['schedule'])
        
        return Response({"error": False, "data": "success"})
    