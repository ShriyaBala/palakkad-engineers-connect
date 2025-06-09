from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password']
        field = ['username', 'email', 'phone']
    def create(self, validated_data):
        import random, string
        from django.core.mail import send_mail

        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        validated_data['password'] = make_password(password)
        user = CustomUser.objects.create(**validated_data)

        send_mail(
            'Your LENSFED Account Password',
            f'Your temporary password is: {password}',
            'noreply@lensfed.in',
            [user.email],
            fail_silently=False,
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'phone']
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
