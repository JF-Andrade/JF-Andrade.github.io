# Expert Review & Roadmap: Maximizing MAP@12

**Author:** Antigravity (Senior Data Scientist / MLOps Engineer)
**Date:** 2025-12-07

## Executive Summary

The project currently boasts a **High-Quality MLOps Foundation**. The architecture is clean, modular, and follows best practices for production systems (100% local, scalable pipelines, artifact tracking).

However, from a **Recall & Ranking perspective**, there is significant "low-hanging fruit" to improve the **MAP@12** metric. The current implementation is a solid baseline, but sophisticated Ranking techniques are missing.

---

## 🔍 Deep Dive Analysis

### 1. Retrieval Stage (Two-Tower)

_Current Status: Standard TFRS with In-Batch Negatives._

- **✅ Strength:** Correct implementation of Dual Encoder architecture. Good handling of image features via projection.
- **⚠️ Weakness (Critical):** **Effective Batch Size & Negative Sampling.**
  - TFRS relies on "In-Batch Negatives". If your batch size is small (e.g., 2048), the model only learns to distinguish the positive from 2047 random items.
  - **Missed Opportunity:** Hard Negative Mining. The model rarely sees "difficult" negatives (items the user _almost_ bought but didn't).
- **⚠️ Weakness:** **Candidate Pool Size (`K=100`).**
  - Retrieving only 100 candidates puts a hard ceiling on Recall. If the ground truth item is at position 101, the Ranker _never sees it_, and MAP@12 is impossible to recover.

### 2. Ranking Stage (CatBoost)

_Current Status: Binary Classification (Logloss/AUC) on imbalanced data._

- **✅ Strength:** Robust Gradient Boosting model, use of GPU, good feature engineering pipeline.
- **❌ Optimization Flaw:** using **Binary Classification** for a **Ranking Problem**.
  - Current Objective: `Logloss` (or `AUC`).
  - Problem: The model treats "Item A vs Item B" independently. It tries to predict $P(Buy|Item)$.
  - **Better Approach:** **Learning to Rank (LTR)** objectives like `YetiRank` or `PairLogitPairwise`. These loss functions directly optimize the _order_ of items (Listwise/Pairwise), which correlates much better with MAP@12.
- **⚠️ Feature Gap:**
  - **Contextual Features:** Features like "Day of Week" of the prediction are missing.
  - **interaction Features:** Interaction between User/Item embeddings (Dot Product, Cosine Similarity) is explicitly calculated (`retrieval_score`), which is excellent.

### 3. Data & Validation

_Current Status: Time-based split, strict anti-leakage._

- **✅ Strength:** The "Gold Standard" sliding window validation is theoretically mentioned.
- **⚠️ Improvement:** The `Validation` set is small (7 days). A single fold might be noisy.

---

## 🚀 Roadmap to SOTA (State of the Art)

Below is the prioritized roadmap to boost MAP@12, ranked by ROI (Effort vs. Impact).

### Phase 1: The "Free Lunch" (High Impact, Low Effort)

1.  **Switch to Ranking Loss (CatBoost):**

    - **Action:** Change `loss_function` from `Logloss` to **`YetiRank`** or **`PairLogitPairwise`**.
    - **Why:** Directly optimizes mean average precision.
    - **Effort:** 10 mins (Config change).

2.  **Increase Retrieval Depth:**

    - **Action:** Increase Candidate Generation `K` from `100` to **`500`** or **`1000`**.
    - **Why:** Immediately increases the "Recall Ceiling". The Ranker is fast enough to handle 1000 items.
    - **Effort:** 5 mins (Config change).

3.  **Add "Day of Week" Feature:**
    - **Action:** Add the predicted day of week (usually "Wednesday" for the private leaderboard, or the first day of the valid window) as a categorical feature. Fashion is highly seasonal (weekend vs weekday).
    - **Effort:** 30 mins.

### Phase 2: Algorithm & Architecture (High Impact, Medium Effort)

4.  **Implementing Mixed Negative Sampling (TFRS):**

    - **Action:** Mix "In-Batch" negatives with "Uniform Random" negatives during training.
    - **Why:** Prevents the "popularity bias" where the model only recommends popular items because they appear frequently in batches as negatives.
    - **Effort:** Higher (requires custom Loop or TFRS advanced usage).

5.  **Expand Candidate Sources:**
    - **Action:** Add a **"Recently Viewed/Purchased"** candidate source (simple heuristic source) to the candidate pool.
    - **Why:** Two-Tower is great for exploration, but simple "User bought X -> Recommend X again" is a very strong baseline in retail usage.
    - **Effort:** Medium.

### Phase 3: Fine-Tuning & Ensembling (Medium Impact, High Effort)

6.  **Ensemble Rankings:**
    - **Action:** Train 3 Rankers (CatBoost, XGBoost, LGBM) and average their scores.
    - **Why:** Ensembling almost always squeezes out 1-2% extra performance on Kaggle.

---

## 🏆 Recommended Immediate Action

Execute **Phase 1** immediately. It requires minimal code changes but fundamentally changes the optimization reliability.

1.  edit `src/config.py`: Set `TOP_K = 1000`.
2.  edit `src/pipelines/ranking.py`: Update CatBoost params to use `loss_function="YetiRank"`.
