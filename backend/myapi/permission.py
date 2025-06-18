# permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminInScopeOrReadOnly(BasePermission):
    """
    Custom permission for hierarchical, scope-aware access.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user

        # Allow read-only for everyone
        if request.method in SAFE_METHODS:
            return True

        # Super Admin: full access
        if user.role == 'superadmin':
            return True

        # Area Admin: can manage only within their area
        if user.role == 'areaadmin':
            return hasattr(obj, 'area') and obj.area == user.area

        # Unit Admin: can manage only within their unit
        if user.role == 'unitadmin':
            return hasattr(obj, 'unit') and obj.unit == user.unit

        # Shop User: can manage only their own advertisements
        if user.role == 'shop':
            return hasattr(obj, 'shop') and obj.shop == user

        # Members: read-only
        return False

    def has_permission(self, request, view):
        # Allow read-only for everyone
        if request.method in SAFE_METHODS:
            return True
        # Only allow authenticated users for write
        return request.user and request.user.is_authenticated