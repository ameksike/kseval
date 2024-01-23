export type TList<T = any> = {
    [name: string]: T;
};
export type TFnFormat = (expression: string, data: any, opt: any) => {
    expression: string;
    data: any;
    opt: any;
};
export type TEnumTarget = 'function' | 'eval';
export type TOptNative = {
    error?: Error;
    interpolate?: boolean;
    destructuring?: boolean;
    expression?: string;
    data?: any;
    target?: TEnumTarget;
    format?: TFnFormat;
};
export type TOptParser = {
    error?: Error;
    expression?: string;
    data?: any;
};
export type TEvaluator = import('./evaluator');
export type TNativeEval = import('./native');
export type TParserEval = import('./parser');
export type TDriver = {
    /**
     * - The type of NativeEval.
     */
    NativeEval: typeof import('./native');
    /**
     * - The type of ParserEval.
     */
    ParserEval: typeof import('./parser');
    /**
     * - The type of Evaluator.
     */
    Evaluator: typeof import('./evaluator');
};
export type TKsEval = {
    [name: string]: Function | import("./evaluator") | TDriver;
    native?: TNativeEval;
    parser?: TParserEval;
    driver?: TDriver;
    get: <T>(name?: string, params?: any[]) => T;
};
