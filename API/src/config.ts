//configuration information 
export const Config={
    serverport: process.env.PORT || 3000,
    secret: process.env.SECRET || "some-secret-goes-here",
    tokenLife: 10000,
    url: process.env.MONGOURL ||"mongodb+srv://cisc474:cisc474@cluster0.azrxt.mongodb.net/postem-notes?retryWrites=true&w=majority"
}