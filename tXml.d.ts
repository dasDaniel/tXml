import * as stream from 'stream';

export interface INode {
    tagName: string;
    attributes: IAnyObject;
    children: [INode | string];
}

export interface IParsingOptions {
    /**
     * position to start
     */
    pos?: string;

    /**
     * names of tags that do not get closed, even they are don't close with '\>'
     * default is good for html: ['img', 'br', 'input', 'meta', 'link']
     * for other xml you might have to set it empty
     */
    noChildNodes?: string[];

    /**
     * boolean to indicate that you need to know the ending position.
     */
    setPos: boolean;

    /**
     * filter the output nodes, same as xml.filter after parsing.
     */
    filter?: (node: INode,i: number, dept: number, path: string) => boolean;
}

export interface IAnyObject {
    __attributes: IAnyObject
    [x: string]: string | IAnyObject
}

export declare function xml(S: string, options?: IParsingOptions): [INode];
export declare function simplify(nodes: INode[]): IAnyObject;
export declare function simplifyLostLess(nodes: INode[]): IAnyObject;
export declare function filter(nodes: INode, filter: (node:INode,i: number, dept: number, path: string) => boolean): INode;
export declare function stringify(nodes: INode[]): string;
export declare function toContentString(nodes: INode): string;


/**
 * 
 * This function is incredible fast, as it is able not to parse the entire xml,
 * but only the requested element. 
 * 
 * @param S the xml string
 * @param id the element identifier for what you are interested
 * @param simplify (optional) wether to call simplify
 */
export declare function getElementById(S: string, id: string, simplify?: false): INode;
export declare function getElementById(S: string, id: string, simplify: true): IAnyObject;

/**
 * 
 * Also, this function will speed up your data processing immense.
 * as getElementBytId, it will only parse the requested elements,
 * not the rest.
 * 
 * @param S the xml string
 * @param className  the element's class for what you are interested
 * @param simplify (optional) wether to call simplify
 */
export declare function getElementsByClassName(S: string, className: string, simplify?: false): [INode];
export declare function getElementsByClassName(S: string, className: string, simplify: true): IAnyObject;

/**
 * 
 * @param stream has extra event xml, that return parsed objects
 */
export declare function parseStream(stream: string|stream.Stream): stream.Stream;

/**
 * 
 * create transform Stream, that you can pipe buffer or strings to and get a stream of INodes
 * ```js
 * const xmlStream = fileReadStream.pipe(xml.transformStream(planetFilePreamble.length));
 * for await (const node of xmlStream) {
 *   // process node
 * }
 * ```
 */
export declare function transformStream(): stream.Transform;
