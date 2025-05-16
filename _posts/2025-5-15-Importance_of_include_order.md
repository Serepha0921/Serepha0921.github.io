---
title: "The Importance of `#include` Order in C++"
date: 2025-04-14T12:52:30-07:00
categories:
  - TroubleShooting
tags:
  - DLL
  - C++
---
While building a **C++ DLL wrapper** around a vendor-provided SDK, I encountered strange syntax errors that **did not appear when building a normal `.exe` project** using the same SDK. Surprisingly, **reordering the `#include` directives completely resolved the issues**.



## Initial Problem

In my original code, the `#include` directives were ordered like this:

```c++
cppCopyEdit#include "SDK1.h"
#include "SDK2.h"
#include <opencv2/opencv.hpp>
```

This worked perfectly fine in a standard C++ executable project.

However, **when I used the same headers in a DLL project**, several syntax errors and warnings started to appear — all originating from the SDK headers:

```bash
bashCopyEdit'(': illegal token on right side of '::'
'std::tr1': warning STL4002: The non-Standard std::tr1 namespace and TR1-only machinery are deprecated and will be REMOVED.
syntax error: ')' was unexpected here; expected ';'
syntax error: unexpected token ')' following 'expression-statement'
```



## Solutions

Reordering the `#include` statements as shown below resolved all the errors:

```c++
cppCopyEdit#include <opencv2/opencv.hpp>
#include "SDK1.h"
#include "SDK2.h"
```

After this change, all the syntax errors in the SDK headers disappeared, and the DLL built successfully.



## Why This Happens

In C++, the **order of `#include` statements can significantly impact how the compiler interprets macros, types, and templates.** Some headers may rely on specific macros or definitions being present **before** they are included.

Here are a few common reasons this issue can occur:

- **Macros defined by libraries like OpenCV** (e.g., `NOMINMAX`, or standard headers like `<memory>`) may influence how later headers (like SDKs) behave.
- DLL builds often have **different preprocessor definitions or runtime settings** than EXE builds, making them more sensitive to include order.
- **Make sure that all relevant macros (e.g., warning suppressors, configuration flags) are defined before including any headers that depend on them.**
Header files may rely on preprocessor definitions to alter their behavior, so the order of definitions and includes is critical to avoid unexpected compilation issues

In complex C++ projects — especially those using large SDKs or third-party libraries — **`#include` order matters.**

# Conclusion

Even if two C++ projects use the same SDK, the **compilation context (DLL vs EXE)** can introduce small differences.
 The order of your `#include` directives can **make or break a build** — especially when working with older SDKs, deprecated features, or platform-specific macros.

- Always include system and standard headers first.
- Then third-party libraries (like OpenCV).
- Finally, project-specific or SDK headers.
