import math
def oneAndTwo():
    size =input()
    for i in range (int(size)):
        nsize=input()
        nos=input()
        nos=nos.split()
        v=-1
        nos = list(map(int, nos))
        x=nos[0]
        y=math.prod(nos[1:len(nos)])
        for i in range (1,len(nos)):
            # print("i=" +str(i))
            if(x==y):
                v=i
                # print(v)
                break
            else:
                x=x*nos[i]
                y=y/nos[i]
        print(v)
            
       
oneAndTwo()
        
