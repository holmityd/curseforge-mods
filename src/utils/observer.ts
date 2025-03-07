type Subscriber<T> = (value: T) => void;

export interface Observer<T> {
	subscribe: (callback: Subscriber<T>) => () => void;
	value: T;
}

export function observer<T>(initialValue: T): Observer<T> {
	let _value = initialValue;
	const subscribers = new Set<Subscriber<T>>();

	function subscribe(callback: Subscriber<T>) {
		subscribers.add(callback);
		callback(_value);
		return () => subscribers.delete(callback);
	}

	return {
		subscribe,
		set value(newValue: T) {
			_value = newValue;
			for (const callback of subscribers) {
				callback(_value);
			}
		},
		get value(): T {
			return _value;
		},
	};
}
