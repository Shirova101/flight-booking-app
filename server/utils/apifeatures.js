class ApiFeatures {
    constructor(query,queryStr)
    {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
        ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i", // the regex is not case sensitive :- will return both ABC and abC for either of the searches
            },
        }:{};
        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){ // removes some fields from our query so that we are left with only category
        const queryCopy = {...this.queryStr};
        const removeFields = ["keyword","page","limit"];
        
        removeFields.forEach(key => delete queryCopy[key]);
        // Filter For Price and Rating
        let queryStr = JSON.stringify(queryCopy); // converting to string so that
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , key => `$${key}`);
    

        this.query = this.query.find(JSON.parse(queryStr));// JSON.parse converts it back into JSON file format
        return this;
        
    }
    pagination(resultPerPage)
    {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage* (currentPage -1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}

module.exports = ApiFeatures;