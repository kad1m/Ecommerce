from .models import Order, OrderItem, ShippingAddress
from products.models import Product
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from users.serializers import UserSerializer


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ShippingAddressSerializer(ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(ModelSerializer):
    orderItems = SerializerMethodField(read_only=True)
    shippingAddress = SerializerMethodField(read_only=True)
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
