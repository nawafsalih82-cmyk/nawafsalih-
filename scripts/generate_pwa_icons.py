import zlib
import struct
import math
import os

def write_png(filename, width, height, draw_fn):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter byte 0 (None)
        for x in range(width):
            r, g, b, a = draw_fn(x, y, width, height)
            raw_data.extend([r, g, b, a])
    
    compressed = zlib.compress(bytes(raw_data), 9)
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr)
    
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    
    iend_crc = zlib.crc32(b'IEND')
    
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    png.extend(struct.pack('>I', len(ihdr)) + b'IHDR' + ihdr + struct.pack('>I', ihdr_crc))
    png.extend(struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc))
    png.extend(struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc))
    
    with open(filename, 'wb') as f:
        f.write(png)

def app_icon_pixel(x, y, w, h):
    nx = x / float(w)
    ny = y / float(h)
    
    # Distance from center
    cx, cy = 0.5, 0.5
    dx = nx - cx
    dy = ny - cy
    dist = math.sqrt(dx*dx + dy*dy)
    
    # Rounded squircle background
    # Gradient from #081A35 (top left) to #173B70 (bottom right)
    t = (nx + ny) / 2.0
    r0, g0, b0 = 8, 26, 53
    r1, g1, b1 = 23, 59, 112
    bg_r = int(r0 + (r1 - r0) * t)
    bg_g = int(g0 + (g1 - g0) * t)
    bg_b = int(b0 + (b1 - b0) * t)
    
    # Subtle outer gold circle
    if 0.42 <= dist <= 0.45:
        return (245, 158, 11, 240)
    
    # Gold cap triangle in upper center
    if 0.22 <= ny <= 0.42:
        cap_width = (ny - 0.22) / 0.20 * 0.35
        if abs(nx - 0.5) <= cap_width:
            return (252, 211, 77, 255)
            
    # White book pages in lower center
    if 0.48 <= ny <= 0.70:
        if 0.22 <= nx <= 0.78:
            # Book spine split
            if abs(nx - 0.5) > 0.015:
                return (255, 255, 255, 245)
            else:
                return (bg_r, bg_g, bg_b, 255)

    return (bg_r, bg_g, bg_b, 255)

os.makedirs('public', exist_ok=True)
write_png('public/pwa-192x192.png', 192, 192, app_icon_pixel)
write_png('public/pwa-512x512.png', 512, 512, app_icon_pixel)
write_png('public/pwa-maskable-512x512.png', 512, 512, app_icon_pixel)
write_png('public/apple-touch-icon.png', 180, 180, app_icon_pixel)
print("Icons generated successfully!")
