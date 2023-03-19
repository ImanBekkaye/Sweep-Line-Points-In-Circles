import random


class Circle:
    def __init__(self, x, y, r):
        self.x = x
        self.y = y
        self.r = r

    def __lt__(self, other):
        return (self.x - self.r, self.y, self.r) < (other.x - other.r, other.y, other.r)

    def is_point_inside(self, p):
        return (p[0] - self.x) ** 2 + (p[1] - self.y) ** 2 <= self.r ** 2


def generate_random_circles(n):
    circles = []
    for i in range(n):
        x = random.randint(20, 1000)
        y = random.randint(20, 520)
        r = random.randint(20, 120)
        circles.append(Circle(x, y, r))
    return circles



def is_point_inside_circles(circles, points):
    events = []
    for c in circles:
        events.append((c.x - c.r, 'open', c))
        events.append((c.x + c.r, 'close', c))
    for p in points:
        events.append((p[0], 'query', p))
    events.sort()

    active_circles = set()
    inside_points = set()

    for event in events:
        if event[1] == 'open':
            active_circles.add(event[2])
        elif event[1] == 'close':
            active_circles.remove(event[2])
        elif event[1] == 'query':
            for c in active_circles:
                if c.is_point_inside(event[2]):
                    inside_points.add(event[2])
                    break

    return inside_points

