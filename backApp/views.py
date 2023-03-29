import json
import random

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from backApp.services import generate_random_circles, is_point_inside_circles


def main(request):
    # return JsonResponse({'name': 'App started!'})
    return render(request, 'index.html')


@csrf_exempt
def getName(request):
    return JsonResponse({'name': 'Kompjutaciona geometrija'})


@csrf_exempt
def points_in_circles_view(request):
    data = json.loads(request.body)
    n = data['n']

    # Generate n random circles and n random points
    circles = generate_random_circles(n)
    points = [(random.randint(0, 1000), random.randint(0, 520)) for _ in range(n)]

    # Compute the set of points that are inside at least one circle
    inside_points = is_point_inside_circles(circles, points)

    # Return the result as a JSON response
    return JsonResponse({
        'inside_points': list(inside_points),
        'circles': list(map(lambda circle: (circle.x, circle.y, circle.r), circles)),
        'points': list(points)})
