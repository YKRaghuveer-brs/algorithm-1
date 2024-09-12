document.getElementById("kthLargestForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the array and K value from input fields
    const arrayInput = document.getElementById("arrayInput").value.split(',').map(Number);
    const k = parseInt(document.getElementById("kInput").value);

    if (isNaN(k) || k <= 0 || k > arrayInput.length) {
        document.getElementById("resultText").textContent = `Please enter a valid K value (1 to ${arrayInput.length}).`;
        return;
    }

    const result = findKthLargest(arrayInput, k);
    document.getElementById("resultText").textContent = `The ${k}th largest element is: ${result}`;
});

function findKthLargest(arr, k) {
    // Helper function to maintain a min-heap of size k
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        insert(val) {
            this.heap.push(val);
            this.heap.sort((a, b) => a - b);
        }

        removeMin() {
            return this.heap.shift();
        }

        peek() {
            return this.heap[0];
        }

        size() {
            return this.heap.length;
        }
    }

    const minHeap = new MinHeap();
    
    for (let num of arr) {
        minHeap.insert(num);

        // Keep the size of the heap to K
        if (minHeap.size() > k) {
            minHeap.removeMin();
        }
    }

    // The root of the heap will have the Kth largest element
    return minHeap.peek();
}
