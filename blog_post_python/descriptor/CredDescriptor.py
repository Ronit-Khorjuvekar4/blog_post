import aiosqlite
from fastapi import FastAPI, Depends, HTTPException, status

db = "database.db"

async def registerDescriptor(state):

    try:
        
        async with aiosqlite.connect(db) as conn:
            insert_query = """INSERT INTO Users (user_name,password_hash,user_type,email) VALUES (?,?,?,?) """
            insert_params = (state.user_name,state.password,state.user_type,state.email)

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
                                    user_id,user_name, user_type
                                from Users
                                where user_name = ? and password_hash = ?
                            """
            select_params = (state.user_name,state.password)
            async with conn.execute(select_query,select_params) as cursor:
                row = await cursor.fetchone()
            
            if row is None:
                 raise HTTPException(status_code=401, detail="Invalid credentials")
            
            data = {
                "user_id":row[0],
                "user_name" : row[1],
                "user_type":row[2]
            }

            return {"data":data,"msg":"Login Success!"}

    except aiosqlite.Error as error:
        print("Failed to insert data into sqlite table", error)
        return {"error": str(error)}