const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            required: true, 
            trim: true
        }, 
        email: {
            type: String, 
            unique: true,
            required: true, 
            //uhhh is this fine 
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought', 
            },
          ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',   //ummm self reference???
            }
        ],
    },
    //indicating that we want virtuals included in response - transforming objects to json
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;  //should this be a console log
    })


//initializing the User model 
const User = model('user', userSchema); 

module.exports = User; 