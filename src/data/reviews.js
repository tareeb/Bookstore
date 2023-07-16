const reviews = [
    {
        id: 1 ,
        userid : "Areeb" ,
        comment :  "I really like this website. They did great job and well responsed." ,
        likes : 23 ,
        reply : [
            {
                id: 2 ,
                userid : "Ali" ,
                comment :  "I really like this website" ,
                likes : 32 ,
                reply : []
            },
            {
                id: 3 ,
                userid : "Mustafa" ,
                comment :  "Yeah me too" ,
                likes : 28 ,
                reply : [
                    {
                        id: 4 ,
                        userid : "Furqan" ,
                        comment :  "Same for me" ,
                        likes : 53 ,
                        reply : []
                    }
                ]
            },
            {
                id: 5 ,
                userid : "Rehman" ,
                comment :  "I tried it , really it was good" ,
                likes : 12 , 
                reply : []
            }
    ]
    }, 
    {
        id: 6 ,
        userid : "Ali" ,
        comment :  "I really like this website" ,
        likes : 2 ,
        reply : []
    },
    {
        id: 7 ,
        userid : "Ahmed" ,
        comment :  "They did great job and well responsed." ,
        likes : 6 ,
        reply : [{
            id: 8 ,
            userid : "Ali" ,
            comment :  "I really like this website" ,
            likes : 9 ,
            reply : []
        }]

    },
    {
        id: 9 ,
        userid : "Arslan" ,
        comment :  "They are perfect" ,
        likes : 19 ,
        reply : []
    }

]

export default reviews