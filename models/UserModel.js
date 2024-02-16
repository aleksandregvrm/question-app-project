const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "question-guru"],
    default: "user",
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedDate: {
    type: Date,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  passwordToken: {
    type: String,
  },
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});

UserSchema.virtual("quizStats",{
  ref:"QuizStats",
  localField:"_id",
  foreignField:"user",
  justOne:false,
})

UserSchema.pre("deleteOne",{document:true},async function(){
  await this.model("QuizStats").deleteMany({user:this._id})
})

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
