from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Product, Review, Category


class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    section = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'parent', 'top_menu', 'children', 'section')

    def get_children(self, obj):
        children_qs = Category.objects.filter(parent=obj)
        children_serializer = CategorySerializer(children_qs, many=True, context=self.context)
        return children_serializer.data

    def get_section(self, obj):
        section_qs = Category.objects.filter(sections=obj)
        section_serializer = CategorySerializer(section_qs, many=True, context=self.context)
        return section_serializer.data