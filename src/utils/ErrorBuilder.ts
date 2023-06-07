// lib
import {z} from "zod";

const messageSchema = z.string().nonempty();
const levelSchema = z.enum(['LOW', 'MID', 'HIGH']).default('MID');
const traceSchema = z.array(
                        z.object({
                            origin: z.string().nonempty(),
                            message: z.string().nonempty()
                        })).min(1);

class Error {
    public message: z.infer<typeof messageSchema>;
    public level: z.infer<typeof levelSchema>;
    public trace: z.infer<typeof traceSchema>;

    constructor(message: string, level: z.infer<typeof levelSchema>, trace: z.infer<typeof traceSchema>) {
        this.level = level;
        this.message = messageSchema.parse(message);
        this.trace = traceSchema.parse(trace);
    }
}

const ErrorSchema = z.instanceof(Error);

export class ErrorBuilder {
    public message: z.infer<typeof messageSchema>;
    public level: z.infer<typeof levelSchema>;
    public trace: z.infer<typeof traceSchema> | [];


    constructor(message: z.infer<typeof messageSchema>) {
        this.message = message;
        this.level = 'MID';
        this.trace = [];
    }

    public setMessage(message: string) {
        this.message = messageSchema.parse(message);
    }

    public setLevel(level: z.infer<typeof levelSchema>) {
        this.level = level;
    }

    public setTrace(trace: z.infer<typeof traceSchema>){
        this.trace = trace;
    }

    public build(): z.infer<typeof ErrorSchema> {
        const error: z.infer<typeof ErrorSchema> = new Error(messageSchema.parse(this.message), 
                                                            levelSchema.parse(this.level), 
                                                            traceSchema.parse(this.trace));
        return error;
    } 
}