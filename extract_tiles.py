import os
import glob
import struct

def extract_bundle(bundle_path, output_dir, z):
    basename = os.path.basename(bundle_path)
    if not basename.endswith('.bundle'):
        return
    
    name = basename[:-7] # remove .bundle
    # name format RrrrrCcccc in hex
    try:
        r_hex = name[1:5]
        c_hex = name[6:10]
        base_y = int(r_hex, 16)
        base_x = int(c_hex, 16)
    except:
        print(f"Skipping {bundle_path}, bad name format")
        return

    with open(bundle_path, 'rb') as f:
        # Check if v2
        f.seek(0)
        header = f.read(64)
        if len(header) < 64:
            return
        
        # In V2, index starts at 64. 128x128 = 16384 tiles.
        # Each index is 8 bytes.
        index_data = f.read(16384 * 8)
        if len(index_data) < 16384 * 8:
            return

        for i in range(16384):
            idx_offset = i * 8
            entry = index_data[idx_offset:idx_offset+8]
            
            # offset is 5 bytes, size is 3 bytes (little endian)
            offset = entry[0] + (entry[1]<<8) + (entry[2]<<16) + (entry[3]<<24) + (entry[4]<<32)
            size = entry[5] + (entry[6]<<8) + (entry[7]<<16)
            
            if size > 0:
                f.seek(offset)
                tile_data = f.read(size)
                
                # Tile could be empty / just a header, but let's save everything > 0
                ty = base_y + (i // 128)
                tx = base_x + (i % 128)
                
                zx_dir = os.path.join(output_dir, str(z), str(tx))
                os.makedirs(zx_dir, exist_ok=True)
                tile_path = os.path.join(zx_dir, f"{ty}.png")
                
                with open(tile_path, 'wb') as tf:
                    tf.write(tile_data)

def main():
    root_dir = r"C:\Project\code\solar-webmap\public\tile_layer\solaRaKKN_CON\_alllayers"
    output_dir = r"C:\Project\code\solar-webmap\public\tile_layer\solaRaKKN_CON"
    
    # find all L** folders
    level_dirs = glob.glob(os.path.join(root_dir, "L*"))
    for l_dir in level_dirs:
        level_name = os.path.basename(l_dir)
        try:
            z = int(level_name[1:]) # L11 -> 11
        except:
            continue
            
        bundles = glob.glob(os.path.join(l_dir, "*.bundle"))
        for bundle in bundles:
            print(f"Extracting {bundle} (Z={z})")
            extract_bundle(bundle, output_dir, z)

    print("Extraction complete!")

if __name__ == "__main__":
    main()
