declare namespace jasmine {
    interface Matchers<T> {
        toDeepEqual(expected: any, expectationFailOutput?: any): boolean;
    }
}