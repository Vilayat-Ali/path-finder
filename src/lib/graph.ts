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
const nullableNodeSchema = z.instanceof(Node).nullable();
const sizeSchema = z.number().min(1).nonnegative();

export class Graph {
    public graph: z.infer<typeof nodeSchema>;
    public width: z.infer<typeof sizeSchema>;
    public height: z.infer<typeof sizeSchema>;

    constructor(width: number, height: number){
        this.graph = Graph.constructGraph(width, height);
        this.width = sizeSchema.parse(width);
        this.height = sizeSchema.parse(height);
    }

    private static constructGraph(width: number, height: number): z.infer<typeof nodeSchema>{
        let graph: Node | null = null;
        const rows: number = sizeSchema.parse(width);
        const cols: number = sizeSchema.parse(height);

        const constructRow = (width: number): Node => {
            let head: Node = new Node('path');
            
            for(let i=1; i<width; i++){
                const newNode: z.infer<typeof nodeSchema> = new Node('path');
                newNode.next.right = head;
                head = newNode;
            }

            return head;
        };

        const makeConnections = (newRow: z.infer<typeof nullableNodeSchema>) => {
            let graphStart: Node|null = graph;
            let newRowStart: Node|null = newRow;

            while(graphStart?.next.right !== undefined && newRowStart?.next.right !== undefined) {
                let depthStart: Node|null = graphStart;

                while(depthStart?.next.bottom !== null ){
                    // traversing to the bottom-most of a column
                    depthStart = depthStart?.next.bottom as Node;
                }

                // making connections with graph and next node
                depthStart.next.bottom = newRowStart;
                (newRowStart as Node).next.top = depthStart;
                
                // traversing to next col in graph and next node of new row
                graphStart = graphStart?.next.right as Node;
                newRowStart = newRowStart?.next.right as Node;
            }
        };

        for(let col=0; col<cols; col++){
            for(let row=0; row<rows; row++){
                if(row === 0){
                    graph = constructRow(rows);
                    break;
                }
                const curr_row: Node = constructRow(rows);
                makeConnections(curr_row);
            }
        }

        return (graph as Node);
    }
}