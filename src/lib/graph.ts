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

        for(let col=1; col<this.width; col++) {
            const currentNode: z.infer<typeof nodeSchema> = nodeSchema.parse(Graph.generateDoublyLinkedList(this.width));

        }
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
}