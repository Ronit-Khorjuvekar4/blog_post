from fastapi import FastAPI, Depends
import aiosqlite  # Use aiosqlite for async support
from db import get_db_connection

db = "database.db"

async def AddDataDescriptor(state):
    try:
        # Only use the asynchronous connection
        async with aiosqlite.connect(db) as conn:
            
            await conn.execute("""INSERT INTO Blogs (user_id, blog_title, blog_subject, blog_content) VALUES (?, ?, ?, ?);""", 
                               (state.user_id, state.blog_title, state.blog_subject, state.blog_content))
            await conn.commit()

        return {"message": "Data Added Successfully!!"}

    except aiosqlite.Error as error:
        print("Failed to insert data into sqlite table", error)
        return {"error": str(error)}
     
async def getDataDescriptor():
    try:

        async with aiosqlite.connect(db) as conn:
            async with conn.execute("SELECT blog_id,blog_title,blog_subject,blog_content,user_id FROM Blogs") as cursor:
                rows = await cursor.fetchall()

            data = [
                {
                    "blog_id": row[0],
                    "blog_title": row[1],
                    "blog_subject": row[2],
                    "blog_content": row[3],
                    "user_id": row[4]
                }
                for row in rows
            ]

            return {"data":data}

    except aiosqlite.Error as error:
        print("Failed to retrieve data: ", error)
        return {"error": str(error)}
    
async def deleteDataDescriptor(id,user_id):
    try:


        async with aiosqlite.connect(db) as conn:
            delete_query = """DELETE FROM Blogs WHERE blog_id = ? and user_id = ?"""
            delete_params = (id,user_id,)
            await conn.execute(delete_query,delete_params)
            await conn.commit()

            return {"message": "Blog Deleted Successfully!!"}
        
    except aiosqlite.Error as error:
        print("Failed to retrieve data: ", error)
        return {"error": str(error)}       
    
async def editDataDescriptor(id,user_id,state):
    print(id,user_id)
    try:

        async with aiosqlite.connect(db) as conn:
            update_query = """UPDATE Blogs set
                            blog_title = ?, blog_subject = ?, blog_content = ?
                            WHERE blog_id = ? AND user_id = ?;"""

            update_params = (state.blog_title, state.blog_subject, state.blog_content,id,user_id,)

            await conn.execute(update_query,update_params)
            await conn.commit()

            return {"message": "Blog Updated Successfully!!"}

    except aiosqlite.Error as error:
        print("Failed to retrieve data: ", error)
        return {"error": str(error)} 
    
async def addProfileDescriptor(state):
    
    try:
        flag = None
        async with aiosqlite.connect(db) as conn:
            select_query = """select email,age,about from profile_info where user_id = ?"""
            select_params = (state.user_id,)
            cursor = await conn.execute(select_query,select_params)
            row = await cursor.fetchone()

            print(row)

            if row:
                existing_email, existing_age,existing_about = row
                feilds = []
                values = []

                if state.email is not None and state.email != existing_email:
                    feilds.append("email = ?")
                    values.append(state.email)

                
                if state.age is not None and state.age != existing_age:
                    feilds.append("age = ?")
                    values.append(state.age)

                if state.about is not None and state.about != existing_about:
                    feilds.append("about = ?")
                    values.append(state.about)

                if feilds:
                    update_query = f"update profile_info set {','.join(feilds)} where user_id = ?"
                    update_params = values + [state.user_id]
                    await conn.execute(update_query,update_params)
                    await conn.commit()

                flag = {"data":"Update data success!"}
            else:
                insert_query = """INSERT INTO profile_info (user_id, email, age, about) VALUES (?, ?, ?, ?)"""
                insert_params = (state.user_id,state.email,state.age,state.about)
                await conn.execute(insert_query,insert_params)
                await conn.commit()

                flag = {"data":"Data Inserted success!"}
        return flag

            
        

    except aiosqlite.Error as error:
        print("Failed to add in profile_info table:",error)
        return {"error":error}

async def getProfileDataDescriptor():
    try:

        

        async with aiosqlite.connect(db) as conn:
            async with conn.execute("SELECT email, age,about FROM profile_info") as cursor:
                rows = await cursor.fetchall()
            data = [
                {
                    "email":row[0],
                    "age": row[1],
                    "about": row[2]
                }
                for row in rows
            ]

            return {"data":data}

    except aiosqlite.Error as error:
        print("Failed to retrieve data: ", error)
        return {"error": str(error)}
    
