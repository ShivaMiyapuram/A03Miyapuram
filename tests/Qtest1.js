var checker = {
	
	checkNumber:function(number)
	{
        var num = "wrong";
        try{
            if(isNaN(number)==true) 
                throw "Number cannot be string";
            if(number=="")
            throw "Number cannot be empty";

            if (number<0)
            throw "Number cannot be negative";

            num = "right";
        }
        catch(error)
        {
            num = error
        }

        return num;
    }
};