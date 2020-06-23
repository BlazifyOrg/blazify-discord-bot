import {Entity , Column , PrimaryGeneratedColumn , ObjectIdColumn , ObjectID} from "typeorm";

@Entity("warns")
export class UserXP {
    @ObjectIdColumn({name: "_id"})
    public _id?: ObjectID;

    @Column("user")
    public user?: string

    @Column("guild")
    public guild?: string

    @Column("xp")
    public xp?: number

    @Column("level")
    public level?: number

    @Column("xpcoins")
    public xpcoins?: number
}