import {z} from "zod";

const NodeDataSchema = z.enum(['path', 'start', 'target', 'wall']);

// Node definition of the graph
class Node {
    public nodeType: z.infer<typeof NodeDataSchema>;
    public next: z.infer<typeof NodeNextSchema>;

    constructor(NodeType: z.infer<typeof NodeDataSchema>) {
        this.nodeType = NodeDataSchema.parse(NodeType);
        this.next = {
            top: null,
            bottom: null,
            left: null,
            right: null
        }
    }
}

const NodeNextSchema = z.object({
    top: z.instanceof(Node).nullable(),
    bottom: z.instanceof(Node).nullable(),
    left: z.instanceof(Node).nullable(),
    right: z.instanceof(Node).nullable()
});

const nodeSchema = z.instanceof(Node);
const sizeSchema = z.number().min(1).nonnegative();
 
const sizeInputSchema = z.number().max(110).nonnegative();

export class Graph {
    public graph: z.infer<typeof nodeSchema>;
    public width: z.infer<typeof sizeSchema>;
    public height: z.infer<typeof sizeSchema>;

    constructor(width: number, height: number){
        this.width = sizeSchema.parse(width);
        this.height = sizeSchema.parse(height);
        // this.graph = this.initGraph();
        console.log(this.initGraph());
    }

    private initGraph() {
        let graph: z.infer<typeof nodeSchema> = nodeSchema.parse(Graph.generateDoublyLinkedList(this.width));

        for(let row=1; row<this.height; row++) {
            const currentNode: z.infer<typeof nodeSchema> = nodeSchema.parse(Graph.generateDoublyLinkedList(this.width));

            
        }
    }

    private static coupleListWithGraph(graph: z.infer<typeof nodeSchema>, list: z.infer<typeof nodeSchema>): z.infer<typeof nodeSchema> {
        return new Node("path");
    }

    private static generateDoublyLinkedList(size: z.infer<typeof sizeSchema>): z.infer<typeof nodeSchema> {
        let list: z.infer<typeof nodeSchema> = new Node("path");

        for(let i=0; i<sizeSchema.parse(size); i++) {
            const newNode: z.infer<typeof nodeSchema> = new Node("path");
            list.next.left = newNode;
            newNode.next.right = list;
            list = newNode;
        }

        return list;
    }

    public getNodeAt(columnNumber: z.infer<typeof sizeInputSchema>, rowNumber: z.infer<typeof sizeInputSchema>): z.infer<typeof nodeSchema>|unknown {
       try {
        if(columnNumber > this.height || rowNumber > this.width) {
            throw new Error("Error: getNodeAt(x, y) points to coordinates that are out of bounds of graph");
        }

       } catch (err: unknown) {
        return err;
       }
    }
}