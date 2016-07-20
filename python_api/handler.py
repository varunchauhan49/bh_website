import MySQLdb
from config import mysql as cfg
from flask import current_app

class DBMaster:
    connection = None
    cursor = None

    def __init__(self):
        self.getConnection()
        pass

    def getConnection(self):
        try:
            self.connection = MySQLdb.connect(host=cfg['host'],
                                              user=cfg['user'],
                                              passwd=cfg['passwd'],
                                              db=cfg['db'])
        except Exception as error:
            current_app.logger.error("DB Connection Error")
            current_app.logger.error(str(error.__class__) + ": " + error.message)
            raise Exception("We are experiencing some problems. Please try again after some time")
        self.connection.autocommit(True)
        self.cursor = self.connection.cursor(MySQLdb.cursors.DictCursor)
        return self.connection

    def queryDB(self, query):
        self.cursor.execute(query)
        result = self.cursor.fetchall()
        return result

    def insertDB(self, query):
        self.cursor.execute(query)
        count = self.cursor.rowcount
        return count

    def closeConnection(self):
        self.cursor.close()

    def search(self, inputJSON):
        search = inputJSON.get("search", "")
        placeholders = inputJSON.get("city", "")
        city = ', '.join(map(str, placeholders))
        if (not search):
            return "Empty"
        query = """
            select bpm.name,bpm.type,CONCAT('http://res.cloudinary.com/varunchauhan49/image/upload/v1467630383/',REPLACE(bpm.featured_image, ' ', ''))
            as featured_image,bpm.bhooka_recomends,bpm.parking,bpm.phone,bpm.address,bpm.lat,bpm.long from bhooka_master.bh_post_master
            as bpm where bpm.city_id IN (%s) and bpm.post_id IN  (select distinct(post_id)
            from (SELECT post_id FROM bhooka_master.bh_post_master
            where address like '%%%s%%' or bhooka_recomends like '%%%s%%' or name like '%%%s%%'
            union
            select bpm.post_id from bhooka_master.bh_post_category_membership as bpcm, bhooka_master.bh_post_master as bpm
            where bpm.post_id = bpcm.post_id
            and bpcm.cat_id IN (SELECT cat_id FROM bhooka_master.bh_category_master
            where name like '%%%s%%')
            union
            SELECT bpm.post_id FROM bhooka_master.bh_post_metro_membership as bpmm,bhooka_master.bh_post_master as bpm
            where bpm.post_id = bpmm.post_id
            and bpmm.metro_id IN (SELECT metro_id FROM bhooka_master.bh_metro_master
            where name like '%%%s%%')
            union
            SELECT bpm.post_id FROM bhooka_master.bh_post_master as bpm
            where bpm.loc_id IN (SELECT loc_id FROM bhooka_master.bh_city_location
            where name like '%%%s%%')
            union
            SELECT bpm.post_id FROM bhooka_master.bh_post_master as bpm,bhooka_master.bh_post_tag_membership as bptm
            where bptm.post_id = bpm.post_id and bptm.tag_id IN (SELECT tag_id FROM bhooka_master.bh_tags_master
            where name like '%%%s%%')) as bh); """
        query = query % (city,search, search, search, search, search, search, search )
        print query
        result = self.queryDB(query)
        current_app.logger.info(query)
        return result

    def postDetails(self, inputJSON):
        id = inputJSON.get("id", "")
        if (not id):
            return "Empty"
        query = """
            SELECT bpm.post_id,bpm.lat,bpm.long,bpm.address, bpm.phone,bpm.parking,bpm.bhooka_recomends,bpm.name, bpm.type,
            CONCAT('http://res.cloudinary.com/varunchauhan49/image/upload/v1467630383/',REPLACE(bpm.featured_image, ' ', '')) as featured_image,
            bcl.name as location,bcm.name as city,bum.email_id,bum.picture as user_pic
            FROM bhooka_master.bh_post_master as bpm,bhooka_master.bh_city_location as bcl,bhooka_master.bh_city_master as bcm,
            bhooka_master.bh_user_master as bum where bcm.city_id = bpm.city_id and bcl.loc_id = bpm.loc_id and
            bum.user_id = bpm.user_id and bpm.post_id=%s; """
        query = query % (id)
        result = self.queryDB(query)
        current_app.logger.info(query)
        outputDict = {}
        outputDict['basic'] = result

        query = """
                SELECT CONCAT('http://res.cloudinary.com/varunchauhan49/image/upload/v1467630383/',
                REPLACE(image_url, ' ', '')) as image FROM bhooka_master.bh_image_master where post_id=%s;
             """
        query = query % (id)
        images = self.queryDB(query)
        outputDict['images'] = images
        current_app.logger.info(query)

        query = """
                SELECT content,email_id,bum.name,bum.handle_name,bum.picture FROM bhooka_master.bh_comments_master
                as bcm,bhooka_master.bh_user_master as bum
                where bum.user_id = bcm.user_id and bcm.post_id =%s;
             """
        query = query % (id)
        comments = self.queryDB(query)
        outputDict["comments"] = comments
        current_app.logger.info(query)

        query = """
                SELECT bcm.name as category FROM bhooka_master.bh_category_master as bcm,
                bhooka_master.bh_post_category_membership as bpcm
                where bcm.cat_id = bpcm.cat_id and bpcm.post_id =%s;
             """
        query = query % (id)
        categories = self.queryDB(query)
        outputDict["categories"] = categories
        current_app.logger.info(query)

        query = """
                SELECT btm.name as tag FROM bhooka_master.bh_tags_master as btm,bhooka_master.bh_post_tag_membership as bptm
                where btm.tag_id = bptm.tag_id and bptm.post_id =%s;
             """
        query = query % (id)
        tags = self.queryDB(query)
        outputDict["tags"] = tags
        current_app.logger.info(query)

        query = """
                SELECT bmm.name as metro FROM bhooka_master.bh_metro_master as bmm,bhooka_master.bh_post_metro_membership as bpmm
                where bmm.metro_id = bpmm.metro_id and bpmm.post_id =%s;
             """
        query = query % (id)
        metro = self.queryDB(query)
        outputDict["metro"] = metro
        current_app.logger.info(query)

        return outputDict

    def filters(self, inputJSON):
        placeholders = inputJSON.get("city", "")
        city = ', '.join(map(str, placeholders))
        if (not city):
            return "Empty"
        query = """
            SELECT name as category,cat_id FROM bhooka_master.bh_category_master; """
        result = self.queryDB(query)
        current_app.logger.info(query)
        outputDict = {}
        outputDict['categories'] = result

        query = """
                SELECT name as location,loc_id FROM bhooka_master.bh_city_location
                where city_id IN (%s);
             """
        query = query % (city)
        comments = self.queryDB(query)
        outputDict["locations"] = comments
        current_app.logger.info(query)

        return outputDict

    def filterResults(self, inputJSON):
        type = inputJSON.get("type", "")
        parking = inputJSON.get("parking", "")
        locations = inputJSON.get("locations", "")
        categories = inputJSON.get("categories", "")
        placeholders = inputJSON.get("city", "")
        city = ', '.join(map(str, placeholders))
        query = """
            SELECT bpm.name,bpm.type,CONCAT('http://res.cloudinary.com/varunchauhan49/image/upload/v1467630383/',REPLACE(bpm.featured_image, ' ', ''))
             as featured_image,bpm.bhooka_recomends,bpm.parking,bpm.phone,bpm.address,bpm.lat,bpm.long FROM bhooka_master.bh_post_master as bpm
             where bpm.city_id in (%s)
        """
        query = query % (city)
        if (type):
            tempList = ', '.join('"{0}"'.format(w) for w in type)
            query = query + " and type IN (%s)"
            query = query % (tempList)
        if (parking):
            query = query + " and parking = %s"
            query = query % (parking)
        if (locations):
            tempList = ', '.join('"{0}"'.format(w) for w in locations)
            query = query + """ and post_id IN (SELECT bpm.post_id FROM bhooka_master.bh_post_master as bpm
            where bpm.loc_id IN (SELECT loc_id FROM bhooka_master.bh_city_location
            where name IN (%s)))"""
            query = query % (tempList)
        if (categories):
            tempList = ', '.join('"{0}"'.format(w) for w in categories)
            query = query + """ and post_id IN (select bpm.post_id from bhooka_master.bh_post_category_membership as bpcm,
             bhooka_master.bh_post_master as bpm where bpm.post_id = bpcm.post_id and bpcm.cat_id IN (SELECT cat_id FROM
             bhooka_master.bh_category_master where name IN (%s)));"""
            query = query % (tempList)
        result = self.queryDB(query)
        current_app.logger.info(query)
        return result

    def postComment (self, inputJSON):
        email = inputJSON.get("email", "")
        content = inputJSON.get("content", "")
        post_id = inputJSON.get("post_id", "")
        if(not email or not content or not post_id):
            return "Empty"
        query = """
            INSERT INTO bhooka_master.bh_comments_master(post_id,user_id,content)
            values(%s,(SELECT user_id FROM bhooka_master.bh_user_master where email_id='%s'),'%s');
        """
        query = query%(post_id,email,content)
        try:
            self.insertDB(query)
        except Exception as e:
            self.connection.rollback()
            raise e

        self.connection.commit()
        return "Request Successful"

    def postLikeDislike(self, inputJSON):
        email = inputJSON.get("email", "")
        like_dislike = inputJSON.get("like_dislike", "")
        post_id = inputJSON.get("post_id", "")
        if (email == "" or like_dislike == "" or post_id == ""):
            return "Empty"
        query = """
            INSERT INTO bhooka_master.bh_like_dislike_master(user_id,post_id,like_dislike)
            values((SELECT user_id FROM bhooka_master.bh_user_master where email_id='%s'),%s,%s)
        """
        query = query % (email,post_id, like_dislike)
        try:
            self.insertDB(query)
        except Exception as e:
            self.connection.rollback()
            raise e

        self.connection.commit()
        return "Request Successful"

    def postRating(self, inputJSON):
        email = inputJSON.get("email", "")
        rating = inputJSON.get("rating", "")
        post_id = inputJSON.get("post_id", "")
        print email, rating, post_id
        if (email == "" or rating == "" or post_id == ""):
            return "Empty"
        query = """
            INSERT INTO bhooka_master.bh_rating_master(user_id,post_id,rating_value)
            values((SELECT user_id FROM bhooka_master.bh_user_master where email_id='%s'),%s,%s)
        """
        query = query % (email, post_id, rating)
        try:
            self.insertDB(query)
        except Exception as e:
            self.connection.rollback()
            raise e

        self.connection.commit()
        return "Request Successful"

    def createUser(self, inputJSON):
        email = inputJSON.get("email", "")
        name = inputJSON.get("name", "")
        picture = inputJSON.get("picture", "")
        print email, name, picture
        if (email == "" or name == "" or picture == ""):
            return "Empty"
        query = """
            INSERT INTO bhooka_master.bh_user_master(name,email_id,handle_name,Access,picture) values
            ('%s','%s','%s',1,'%s');
        """
        query = query % (name, email, email.split('@', 1 )[0],picture)
        try:
            self.insertDB(query)
        except Exception as e:
            self.connection.rollback()
            raise e

        self.connection.commit()
        return "Request Successful"

    def searchUser(self, inputJSON):
        email = inputJSON.get("email", "")
        if (not email):
            return "Empty"
        query = """
            SELECT * FROM bhooka_master.bh_user_master where email_id = '%s'; """
        query = query%(email)
        result = self.queryDB(query)
        current_app.logger.info(query)

        return result