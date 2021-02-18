import os
import uuid
import base64

def writeFileToDisk(file_to_write):
    extension = getFileExtension(file_to_write)
    file_uuid = uuid.uuid4()

    final_filename = str(file_uuid) + extension;

    output_file = open("uploaded_files/" + final_filename, 'wb')
    output_file.write(file_to_write['body'])
    return file_uuid

def getFileExtension(file):
    try:
        return os.path.splitext(file['filename'])[1]
    except:
        return ''

def getFile(UUID):
    with open(f"data/{str(UUID)}.png", 'rb') as img_file:
        return img_file

def getAsDataUrl(UUID):
    with open(f"data/{str(UUID)}.png", 'rb') as img_file:

        outputdata = str(base64.b64encode(img_file.read()))
        #outputdata = f"data:image/png;base64,{outputdata[2:-1]}"
        outputdata = "data:image/png;base64," + outputdata[3:-1]

        #outputfile = open('testoutput.txt', 'w')
        #outputfile.write(outputdata)
        return outputdata