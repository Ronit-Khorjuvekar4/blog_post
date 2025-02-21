import aiosqlite
from fastapi import FastAPI, Depends, HTTPException, status

db = "database.db"

async def registerDescriptor(state):

    try:
        
        async with aiosqlite.connect(db) as conn:
            insert_query = """INSERT INTO register (user_name,password) VALUES (?,?) """
            insert_params = (state.user_name,state.password)

            await conn.execute(insert_query,insert_params)
            await conn.commit()
        return {"message": "Data Added Successfully!!"}

    except aiosqlite.Error as error:
        print("Failed to insert data into sqlite table", error)
        return {"error": str(error)}
    
async def loginDescriptor(state):
    try:
        
        async with aiosqlite.connect(db) as conn:
            select_query =  """
                                SELECT 
                                    id,user_name, user_type
                                from register
                                where user_name = ? and password = ?
                            """
            select_params = (state.user_name,state.password)
            async with conn.execute(select_query,select_params) as cursor:
                row = await cursor.fetchone()
            
            if row is None:
                 raise HTTPException(status_code=401, detail="Invalid credentials")
            
            data = {
                "id":row[0],
                "user_name" : row[1],
                "user_type":row[2]
            }

            return {"data":data,"msg":"Login Success!"}

    except aiosqlite.Error as error:
        print("Failed to insert data into sqlite table", error)
        return {"error": str(error)}