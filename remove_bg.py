from PIL import Image

def remove_black_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Calculate luminance (brightness)
        lum = 0.299*item[0] + 0.587*item[1] + 0.114*item[2]
        
        # If it's pure black, alpha is 0
        # For darker pixels, make them semi-transparent to avoid jagged edges
        # Map luminance to alpha (lum 0 = alpha 0, lum > 50 = alpha 255)
        # We can be aggressive: if lum < 15, transparent
        
        if lum < 15:
            new_data.append((item[0], item[1], item[2], 0))
        elif lum < 50:
            alpha = int((lum - 15) / 35.0 * 255)
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append((item[0], item[1], item[2], 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_black_bg('public/images/chakra-new.png', 'public/images/chakra-transparent.png')
print("Background removed and saved to chakra-transparent.png")
