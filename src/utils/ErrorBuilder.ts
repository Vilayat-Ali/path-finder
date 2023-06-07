// lib
import {z} from "zod";

const messageSchema = z.string().nonempty();
const levelSchema = z.enum(['LOW', 'MID', 'HIGH']).default('MID');
const traceSchema = z.object({
    origin: z.string().nonempty(),
    message: z.string().nonempty()
});
const traceArraySchema = z.array(traceSchema).min(1);

class Error {
    public message: z.infer<typeof messageSchema>;
    public level: z.infer<typeof levelSchema>;
    public trace: z.infer<typeof traceArraySchema>;

    constructor(message: string, level: z.infer<typeof levelSchema>, trace: z.infer<typeof traceArraySchema>) {
        this.level = level;
        this.message = messageSchema.parse(message);
        this.trace = traceArraySchema.parse(trace);
    }
}

const ErrorSchema = z.instanceof(Error);
const builderTraceArraySchema = z.array(traceSchema);

export class ErrorBuilder {
    public message: z.infer<typeof messageSchema>;
    public level: z.infer<typeof levelSchema>;
    public trace: z.infer<typeof builderTraceArraySchema> ;


    constructor() {
        this.message = "";
        this.level = 'MID';
        this.trace = [];
    }

    public setMessage(message: string) {
        this.message = messageSchema.parse(message);
    }

    public setLevel(level: z.infer<typeof levelSchema>) {
        this.level = level;
    }

    public addTrace(message: string, origin: string){
        const traceInstance: z.infer<typeof traceSchema> = traceSchema.parse({
            origin,
            message,
        });
        if (!this.trace.includes(traceInstance)) {
            this.trace.push(traceInstance);
        }
    }

    public build(): z.infer<typeof ErrorSchema> {
        const error: z.infer<typeof ErrorSchema> = new Error(messageSchema.parse(this.trace[0].message), 
                                                            levelSchema.parse(this.level), 
                                                            traceArraySchema.parse(this.trace));
        return error;
    } 
}

export type CustomError = z.infer<typeof ErrorSchema>;