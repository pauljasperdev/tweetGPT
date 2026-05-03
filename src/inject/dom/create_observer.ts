type ElementObserver = (
    selector: string,
    onInputAdded: (el: Element) => void,
    onInputRemoved: (el: Element) => void,
) => MutationObserver;

export const createObserver: ElementObserver = (selector, onInputAdded, onInputRemoved) => {
    const getMatches = (node: Node): Element[] => {
        if (!(node instanceof Element)) {
            return [];
        }

        const matches = Array.from(node.querySelectorAll(selector));
        if (node.matches(selector)) {
            matches.unshift(node);
        }
        return matches;
    };

    return new MutationObserver((mutations_list) => {
        mutations_list.forEach((mutation) => {
            mutation.addedNodes.forEach((added_node) => {
                getMatches(added_node).forEach(onInputAdded);
            });

            mutation.removedNodes.forEach((removed_node) => {
                getMatches(removed_node).forEach(onInputRemoved);
            });
        });
    });
}
